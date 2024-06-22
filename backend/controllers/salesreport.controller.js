import {Transaction, Product} from '../models/models.js';
import { startOfWeek, addWeeks, startOfMonth, endOfMonth, addMonths, format, startOfYear } from 'date-fns';

function getAllWeeksOfYear() {
    const now = new Date();
    const startOfYearDate = startOfYear(now); // get the first day of the current year
    const startDate = startOfWeek(startOfYearDate, { weekStartsOn: 1 }); // Assuming week starts on Monday
    const weeks = [];

    for (let i = 0; i < 52; i++) {
        const weekStart = addWeeks(startDate, i);
        const weekEnd = addWeeks(weekStart, 1);
        weeks.push({
            weekNumber: i + 1,
            start: format(weekStart, 'yyyy-MM-dd'),
            end: format(weekEnd, 'yyyy-MM-dd')
        });
    }

    return weeks;
}

function getAllMonthsOfYear() {
    const now = new Date();
    const startOfYearDate = startOfYear(now); // Get the first day of the current year
    const months = [];

    for (let i = 0; i < 12; i++) {
        const monthStart = addMonths(startOfYearDate, i);
        const monthEnd = endOfMonth(monthStart);
        months.push({
            monthNumber: i + 1,
            start: format(monthStart, 'yyyy-MM-dd'),
            end: format(monthEnd, 'yyyy-MM-dd')
        });
    }

    return months;
}

export const getSalesReport = async (req, res) => {
    try{
        const transactions = await Transaction.find({"ordered_products.order_status": 1});

        const productSales = {};
        let totalSales = 0;
        let test = {};
        //aggregate product and total its total sales
        transactions.forEach(transaction => {
            const ordered_products = transaction.ordered_products;
            const sum_total = ordered_products.sum_total;
            const product_id = ordered_products.product_id;
            const order_qty = ordered_products.order_qty;
            
             // update total sales with testing if NaN
            if (!isNaN(sum_total)) {
                totalSales += sum_total;
            } else {
                console.error(`Invalid sum_total value: ${transaction.sum_total}`);
            }
            
            // Update product sales
            if (!productSales[product_id]) {
                productSales[product_id] = { total_qty: 0, totalIncome: 0 };
            }
            productSales[product_id].total_qty += order_qty;
            productSales[product_id].totalIncome += sum_total;
        });

        const arrayOfProductIds = Object.keys(productSales).map(id => parseInt(id, 10));
        // Get product details by aggregating
        const productDetails = await Product.aggregate([
            {
                $addFields: {
                    product_id_int: { $toInt: "$product_id" }
                }
            },
            {
                $match: {
                    product_id_int: { $in: arrayOfProductIds },
                }
            }
        ]);

        const productsSold = productDetails.map(product => ({
            product_id: product.product_id,
            name: product.name,
            total_qty: productSales[product.product_id].total_qty,
            totalIncome: productSales[product.product_id].totalIncome
        }));

        const weeks = getAllWeeksOfYear();
        const months = getAllMonthsOfYear();

        // aggregate sales summaries
        const weeklySales = aggregateSales(transactions,weeks, 'week');
        const monthlySales = aggregateSales(transactions,months, 'month');
        const annualSales = aggregateSales(transactions, [],'year');


        res.status(200).json({
            productsSold,
            totalSales,
            salesSummary: {
                weekly: weeklySales,
                monthly: monthlySales,
                annual: annualSales
            }
        });
    }catch(err){
        console.error(err);
        res.status(500).json({ message: err.message });
    }
}



function aggregateSales(transactions, periods, periodType) {
    const sales = {};

    if (periodType === 'year') {
        transactions.forEach(transaction => {
            const date = new Date(transaction.order_date);
            const key = `${date.getFullYear()}`;

            if (!sales[key]) {
                sales[key] = 0;
            }
            sales[key] += transaction.ordered_products.sum_total;
        });
    } else { //for month and week periods
        periods.forEach(period => {
            sales[period.start] = 0; // initialize to zero all periods

            transactions.forEach(transaction => {
                const date = new Date(transaction.order_date);
                const formattedDate = format(date, 'yyyy-MM-dd');

                if (formattedDate >= period.start && formattedDate < period.end) { // if transaction is within the period
                    sales[period.start] += transaction.ordered_products.sum_total;
                }
            });

            // if no sales for the period, set to 0
            if (sales[period.start] === 0) {
                sales[period.start] = 0;
            }
        });
    }

    return sales;
}
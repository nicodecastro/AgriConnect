import img from '../../Images/404-NotFound.png';

export function NotFound() {
    return(
        <>
            <div style={{ backgroundImage:`url(${img})`,backgroundRepeat:"no-repeat",backgroundSize:"cover",height:"100vh"}} />
        </>
    )
}
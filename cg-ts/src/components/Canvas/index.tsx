export const Canvas = ({ refCanvas, idCanvas }: any) => {
    return <canvas width="800" height="600" ref={refCanvas} id={idCanvas} className="bg-black"/>;
};
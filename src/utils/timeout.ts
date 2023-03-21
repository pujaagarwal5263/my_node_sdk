 const timeOut = (secs: number) =>
        new Promise((res) => setTimeout(res, secs * 1000));

export default timeOut
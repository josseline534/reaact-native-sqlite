class HTTP {
    static instance = new HTTP();

    getCategoria = async (url: string) => {
        try {
            let req = await fetch(url);
            let json = await req.json();
            return json;
        } catch (error) {
            console.log(`http get method error: ${error}`);
            //throw Error(error)
        }
    };
}

export default HTTP;

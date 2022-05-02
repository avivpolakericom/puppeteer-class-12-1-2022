const yaml =require("yaml");
const  fs =require("fs");
const path =require("path");

const readConfig = async (
    configPath
)=> {
    try {
        const config = await yaml.parse(
            fs.readFileSync(path.join(__dirname, configPath), "utf8")
        );
            return config;

    } catch (error) {

            throw new Error(error);

    }
};
module.exports = {readConfig}
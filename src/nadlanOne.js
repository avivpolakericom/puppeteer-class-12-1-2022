const { dataToCsv, getTableFromNadlanOne } = require("./utils");
const fs = require("fs");

const getTableFromNadlanOneAndwriteToCsv = async () => {
    try {
        const data = await getTableFromNadlanOne();
        const csv = await dataToCsv(data);
        fs.writeFile("data.csv", csv, (err) => {
            if (err) {
                console.log(err);
            }
        });
    } catch (error) {
        console.log(error);
    }
};
getTableFromNadlanOneAndwriteToCsv();
setInterval(getTableFromNadlanOneAndwriteToCsv, 1000 * 60 * 60 * 2); //change the last number to the time in hours

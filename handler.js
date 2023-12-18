"use strict";

const fs = require("fs-extra");
const path = require("path");
const Papa = require("papaparse");

const parseOptions = {
    header: true,
    dynamicTyping: false,
    skipEmptyLines: true,
};

const OUTPUT_DIR = path.join(__dirname, "_output");
const INPUT_DIR = path.join(__dirname, "_input");

const handler = async (req, res) => {
    res.send({ hell: 0 });
    return;

    const items = await fs.readdir(INPUT_DIR);
    const fileNames = items.reduce((acc, item) => {
        /* ignore .DS_Store */
        if (/(^|\/)\.[^\/\.]/g.test(item)) return acc;
        acc.push(item);
        return acc;
    }, []);

    let inputFile;
    if (fileNames.length !== 1) {
        res.send({
            ERROR: "Input directory should have one and only one File. Please fix.",
        });
        return;
    } else {
        inputFile = fileNames.pop();
    }

    const pre = inputFile.split("-")[0];
    const stage = ["dev", "staging"].includes(pre) ? pre : "prod";
    const filePath = `${INPUT_DIR}/${inputFile}`;
    const raw = fs.readFileSync(filePath, "utf8");
    const parsed = await Papa.parse(raw.replace(/\uFEFF/g, ""), parseOptions);
    const data = parsed.data;
};

module.exports = handler;

const assert = require("assert");
const fs = require("fs");
const path = require("path");
const { addonName, getDotaPath } = require("./utils");

(async () => {
    const dotaPath = await getDotaPath();
    if (dotaPath === undefined) {
        console.log("No Dota 2 installation found. Addon linking is skipped.");
        return;
    }

    for (const directoryName of ["game", "content"]) {
        const sourcePath = path.resolve(__dirname, "..", directoryName);
        assert(fs.existsSync(sourcePath), `Could not find '${sourcePath}'`);

        const targetRoot = path.join(dotaPath, directoryName, "dota_addons");
        assert(fs.existsSync(targetRoot), `Could not find '${targetRoot}'`);

        const targetPath = path.join(dotaPath, directoryName, "dota_addons", addonName);
        if (fs.existsSync(targetPath)) {
            const isCorrect = fs.statSync(sourcePath).isSymbolicLink() && fs.realpathSync(sourcePath) === sourcePath;
            if (!isCorrect) {
                throw new Error(`'${targetPath}' already exists`);
            }
        }

        fs.renameSync(sourcePath, targetPath);
        fs.symlinkSync(targetPath, sourcePath, "junction");
    }
})().catch(error => {
    console.error(error);
    process.exit(1);
});

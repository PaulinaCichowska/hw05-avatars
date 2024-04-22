export const updateAvatar =
    async (req, res, next) => {
        console.log(req.file)
        if (!req.file) {
            return res.status(400).json({ message: "File isn't a photo" });
        }
        const { path: temporaryPath } = req.file;
        const extension = path.extname(temporaryPath);
        const fileName = `${uuidV4()}${extension}`;
        const filePath = path.join(storeImageDir, fileName);

        try {
            await fs.rename(temporaryPath, filePath);
        } catch (e) {
            await fs.unlink(temporaryPath)
            return next(e)
        }

        const isValidAndTransform = await isImageAndTransform(filePath);
        if (!isValidAndTransform) {
            await fs.unlink(filePath);
            return res
                .status(400)
                .json({ message: "File isnt a photo but is pretending" });
        }
        res.redirect(`/uploaded/${fileName}`)
    }

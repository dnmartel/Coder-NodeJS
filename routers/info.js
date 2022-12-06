// Importo dependencias de express
import { Router } from "express";
import os from "os";

const router = Router();
router.get("/info", (req, res) => {
    if (!req.isAuthenticated()) {
        res.render("login");
    } else {
        res.render("./info.handlebars", {
            argv: process.argv.slice(2),

            platform: process.platform,

            path: process.execPath,

            pid: process.pid,

            nodev: process.version,

            cwd: process.cwd(),

            rss: process.memoryUsage().rss,

            cores: os.cpus().length
        });
    }
});

export default router;

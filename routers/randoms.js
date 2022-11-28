import { Router } from "express";
import { fork } from "child_process";

const router = Router();

router.get("/api/randoms", (req, res) => {
    try {
        const input = req.query.cant || 100000000;
        const random = fork("./random.js", [input]);
        random.on("message", (data) => {
            random.send("OK");
            res.json(data);
        });
    } catch (error) {
        console.log(error);
    }
});

export default router;

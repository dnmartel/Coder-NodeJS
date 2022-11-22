// Importo dependencias de express
import { Router } from "express";
import passport from "passport";

const router = Router();

router.get("/", (req, res) => {
    if (!req.isAuthenticated()) {
        res.render("login");
    } else {
        const { user } = req;
        let email = user.email;
        res.render("productos", { email });
    }
});

router.post(
    "/login",
    passport.authenticate("sign-in", {
        successRedirect: "/",
        failureRedirect: "/failureLogin"
    }),
    (req, res) => {
        res.redirect("/");
    }
);

router.get("/failureLogin", (req, res) => {
    res.render("failureLogin.handlebars");
});

router.post("/logout", (req, res) => {
    const { email } = req.body;
    req.logout((error) => {
        if (!error) {
            res.render("logout.handlebars", { email });
        } else {
            res.send("Ocurrio un  error", error.message);
        }
    });
});

router.get("/register", (req, res) => {
    res.render("./register.handlebars");
});

router.get("/failureRegister", (req, res) => {
    res.render("failureRegister");
});

router.post(
    "/register",
    passport.authenticate("sign-up", {
        successRedirect: "/",
        failureRedirect: "/failureRegister"
    }),
    (req, res) => {
        const { user } = req;
        console.log("register -> user", user);
    }
);

export default router;

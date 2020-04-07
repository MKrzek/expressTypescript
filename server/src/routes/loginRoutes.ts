import { Router, Request, Response, NextFunction } from "express";
interface RequestWithBody extends Request {
  body: { [key: string]: string | undefined };
}
const router = Router();

router.get("/", (req: Request, res: Response) => {
  if (req.session && req.session.loggedIn) {
    res.send(`
    <div>
      <div>You are logged in</div>
      <a href="/logout">Logout</a>
    </div>
    `);
  } else {
    res.send(`
    <div>
      <div>You are not logged in</div>
      <a href="/login">Logout</a>
    </div>
    `);
  }
});

router.get("/login", (req: RequestWithBody, res: Response) => {
  res.send(`
       <form method="POST">
        <div>
        <label>Email</label>
        <input type="text" name="email"/>
        </div>
        <div>
        <label>Password</label>
        <input type="password" name="password"/>
        </div>
        <button>submit</button>
       </form>
    `);
});
router.post("/login", (req: RequestWithBody, res: Response) => {
  const { email, password } = req.body;

  if (email && password && email === "hi@hi.com" && password === "password") {
    req.session = { loggedIn: true };
    res.redirect("/");
  } else {
    res.send("Invalid email or password");
  }
});

router.get("/logout", (res: Request, req: Response) => {
  req.session = undefined;
});

export { router };

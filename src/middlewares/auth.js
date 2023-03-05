const authMiddleware = (ctx, next) => {
    const isLoggedIn = localStorage.getItem('token');

    if (!isLoggedIn) {
        // Redirect to login page
        ctx.navigate('/login');
        return;
    }

    // User is logged in, proceed to next middleware or route handler
    next();
};

export default authMiddleware;

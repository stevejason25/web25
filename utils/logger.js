const printLog = (req, msg) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${req.method} ${req.originalUrl} - ${msg}`);
};

module.exports = printLog;
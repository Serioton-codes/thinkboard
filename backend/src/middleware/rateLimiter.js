import ratelimit from "../config/upstash.js";

const rateLimit= async (req,res,next)=>{
    try {
        const {success}=await ratelimit.limit("my-id");
        if(!success)
            return res.status(429).json({message:"Too many requests, try again later."});
        next();
    } catch (error) {
        console.log("Rate Limit error",error);
        next(error);
    }
};

export default rateLimit;
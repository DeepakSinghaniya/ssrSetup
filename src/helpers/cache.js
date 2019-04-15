import mCache from 'memory-cache';
import { CACHE } from '../../config';

export const cache = duration => {
    return (req, res, next) => {
        if (!CACHE) {
            res.sendResponse = res.send;
            res.send = body => {
                res.sendResponse(body);
            }
            next();
        } else {
            let key = '__express__' + req.originalUrl || req.url;
            let cachedBody = mCache.get(key);
            if (cachedBody) {
                res.send(cachedBody);
                return;
            } else {
                res.sendResponse = res.send;
                res.send = body => {
                    mCache.put(key, body, duration * 1000);
                    res.sendResponse(body);
                }
                next();
            }
        }

    }
}
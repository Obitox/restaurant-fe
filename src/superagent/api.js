import superagent from 'superagent'

const url = `https://localhost:44321/api` 

export const fetchData = async (path) => {
    try {
        const res = await superagent
                            .post(`${url}${path}`)
                            .set({ Accept: 'application/json' });
        return res;
    }
    catch (err) {
        return err;
    }
}

export const fetchDataWithParams = async (path, body) => {
    try {
        const res = await superagent
                            .post(`${url}${path}`)
                            .send({...body})
                            .set({ Accept: 'application/json' });
        return res;
    }
    catch (err) {
        return err;
    }
}

export const request = async (path, data) => {
    try {
        const body = data || {}; 

        const res = await superagent
                            .post(`${url}${path}`)
                            .send({...body})
                            .set({Accept: 'application/json'});
        return res;
    } catch (err) {
       return err; 
    }
}

export const authRequest = async (path, data, auth) => {
    try {
       const body = data || {};
       
       if(auth === null || auth === undefined)
            throw new Error("Unauthorized");

       const res = await superagent
                            .post(`${url}${path}`)
                            .send({...body})
                            .set({Accept: 'application/json',Authorization: `Bearer ${auth.authToken}`, Refresh: auth.refreshToken, CSRF: auth.csrfToken})
        return res;
    } catch (err) {
       return err;
    }
}
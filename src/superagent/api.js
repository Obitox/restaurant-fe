import superagent from 'superagent'

const url = `https://localhost:44338` 

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
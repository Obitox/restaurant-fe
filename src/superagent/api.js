import superagent from 'superagent'

const url = `http://localhost/7000`

export const fetchData = async (path) => {
    const res = await superagent
                        .post(`${url}${path}`)
                        .set({ Accept: 'application/json' });
    return res;
}
let store = [];
export default function handler(req, res){
  if(req.method === 'GET'){
    res.status(200).json(store);
  } else if(req.method === 'POST'){
    const body = req.body || {};
    const id = (store.length+1).toString();
    const item = { id, ...body };
    store.push(item);
    res.status(201).json(item);
  } else {
    res.status(405).end();
  }
}

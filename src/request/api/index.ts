import request from '../../utils/request';
 export default class TableFetch {
   static fetchData () {
    return request({
      url: './table.json',
      method: 'get'
    });
   }
}


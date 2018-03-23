import axios from '../axios';
const user = '/user/profile';
const tags = '/article_tags';
const func = (url, commit, mutations) => {
  axios.get(url)
    .then(
      d => {
        var data = d.data;
        if (data.success) {
          const result = data.result;
          commit(mutations, result);
        }
      },
      err => {}
    );
}
export {
  user,
  tags,
  func
}

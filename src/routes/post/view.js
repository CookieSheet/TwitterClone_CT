const axios = require('axios')

module.exports = async (req, res) => {
    const slug = req.params.slug
    let postData = {}

    const query = `
        query posts { 
            posts {
                id,
                text,
                createdDate,
                user {
                    username
                }
            }
        }`

    try {
        const { data } = await axios.post(process.env.GRAPHQL_ENDPOINT, 
            { 
                query
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                }
            });   
            
        postData = data.data.posts

        res.render('post', { user: req.verifiedUser.user, posts: postData });
    } catch(e) {
        console.log(e.data.response.errors)
        res.redirect('/')
    }   

}
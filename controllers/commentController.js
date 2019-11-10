exports.showCommentPage=(req,res)=>{
    let user_id = req.params.userId;
    res.render("comment.hbs",{userId:user_id});
}
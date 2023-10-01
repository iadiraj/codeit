// exporting method for filtering data
module.exports.UpcomingContestFilter = (data)=>{
    return data.status === "BEFORE";
}
// exporting method for filtering data
module.exports.OngoingContestFilter = (data)=>{
    return data.status === "CODING";
}
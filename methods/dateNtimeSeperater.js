module.exports.dateNtime = (dateTime) => {
    const date = new Date(dateTime);
    date.setMinutes(date.getMinutes() - 15); // Subtract 15 minutes
    const istTime = date.toLocaleString("en-US", { timeZone: "Asia/Kolkata" });
    console.log(istTime);
    const [newDate, newTime] = istTime.split(",");
    return {newDate, newTime};
};

module.exports.currentdateNtime = () => {
    const currentDate = new Date();

    const day = String(currentDate.getDate()).padStart(2, "0");
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const year = currentDate.getFullYear();
    const formattedDate = `${day}/${month}/${year}`;

    const hours = String(currentDate.getHours()).padStart(2, "0");
    const minutes = String(currentDate.getMinutes()).padStart(2, "0");
    const seconds = String(currentDate.getSeconds()).padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedTime = `${hours % 12}:${minutes}:${seconds} ${ampm}`;
    return {formattedDate, formattedTime};
}
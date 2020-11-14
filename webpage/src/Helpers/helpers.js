function getElapsedTime(time) {
    const current = Date.now();
    const elapsed = current - time;
    const seconds = elapsed / 1000;
    const minutes = seconds / 60;
    const hours = minutes / 60;
    const days = hours / 24;
    const weeks = days / 7;
    const months = weeks / 4;
    const years = months / 12;
    const names = ['years', 'months', 'weeks', 'days', 'hours', 'minutes', 'seconds'];
    const values = [years, months, weeks, days, hours, minutes, seconds];
    let measurment;
    let i = 0;
    for (; i < values.length; i++) {
        measurment = values[i];
        if (measurment > 1) {
            break;
        }
    }
    let val = Math.floor(measurment);
    return `${val} ${val > 1 ? names[i] : names[i].substr(0, names[i].length - 1)} ago`;
}

export { getElapsedTime };
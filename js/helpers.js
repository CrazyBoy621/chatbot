export function formatTimeInChat(date) {
    return new Intl.DateTimeFormat("en-US", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour12: true,
        hour: "2-digit",
        minute: "2-digit",
    }).format(new Date(date));
}

export function smartTimeFormatter(date) {
    const givenDate = new Date(date);
    const today = new Date();

    let format = {};
    if (isToday(givenDate)) {
        format = {
            hour12: true,
            hour: "2-digit",
            minute: "2-digit",
        };
    } else if (isWithinCurrentWeek(givenDate)) {
        format = {
            weekday: "short",
        };
    } else if (givenDate.getFullYear() === today.getFullYear()) {
        format = {
            day: "2-digit",
            month: "short",
        };
    } else {
        format = {
            day: "2-digit",
            month: "numeric",
            year: "numeric",
        };
    }

    return new Intl.DateTimeFormat("en-US", format).format(givenDate);
}

export function sortMessagesByTime(data) {
    const localTimeZoneOffset = new Date().getTimezoneOffset();

    data.forEach((message) => {
        const timestamp = new Date(message.timestamp);

        const currentTimeZoneOffset = timestamp.getTimezoneOffset();

        const timeZoneOffsetDifference =
            localTimeZoneOffset - currentTimeZoneOffset;

        timestamp.setMinutes(timestamp.getMinutes() + timeZoneOffsetDifference);

        message.timestamp = timestamp;
    });

    data.sort((a, b) => b.timestamp - a.timestamp);
    return data;
}

export function truncateString(inputString) {
    if (inputString.length > 34) {
        return `${inputString.slice(0, 31)}...`;
    }
    return inputString;
}

function isWithinCurrentWeek(date) {
    const today = new Date();
    const givenDate = new Date(date);
    const millisecondsPerDay = 24 * 60 * 60 * 1000;
    const daysDifference = Math.abs(
        Math.floor((givenDate - today) / millisecondsPerDay)
    );
    return daysDifference <= today.getDay();
}

function isToday(date) {
    const today = new Date();
    const dateYear = date.getFullYear();
    const dateMonth = date.getMonth();
    const dateDay = date.getDate();

    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth();
    const currentDay = today.getDate();

    return (
        dateYear === currentYear &&
        dateMonth === currentMonth &&
        dateDay === currentDay
    );
}

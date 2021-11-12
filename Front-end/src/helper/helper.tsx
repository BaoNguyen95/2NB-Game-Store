

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export function arrayBufferToBase64(buffer: any) {
    var binary = '';
    var bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) => binary += String.fromCharCode(b));
    return window.btoa(binary);
};

export function convertFileToBase64(file: File, callback: (result: any) => void) {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
        callback(reader.result);
    };
    reader.onerror = function (error) {
        console.log('Error: ', error);
    };
}

export const onScrollToTop = (x?: number): void => {
    window.scrollTo({ top: x || 0, behavior: 'smooth' });
}

export const onScrollToBottom = (elementId: string): void => {
    const div = document.getElementById(elementId);
    if (div) {
        div.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
}

export const getDateTime = (date: Date) => {
    if (date) {
        date = new Date(date);
        const hour = date.getHours();
        let minutes = date.getMinutes();
        if (minutes < 10) {
            minutes = 0 + minutes;
        }
        const day = days[date.getDay()];
        return `${hour}:${minutes}, ${day}`;
    }
}
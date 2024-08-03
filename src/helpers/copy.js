export default async function copy(value) {
    try {
        await navigator.clipboard.writeText(value);
        return true;
        // eslint-disable-next-line no-unused-vars
    } catch (e) {
        return false;
    }
};
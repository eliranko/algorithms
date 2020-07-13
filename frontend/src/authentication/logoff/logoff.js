class Logoff {
    static logoff() {
        localStorage.removeItem('token');
        window.location.href = '/';
    }
}

export default Logoff;
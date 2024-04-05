export default function getApiUsers (req, res) {
    const url = process.env.API_URL
    try {
        console.log(url);
        fetch(`${url}/users`)
        
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Error fetching users' });
    }
}
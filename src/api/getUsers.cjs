
async function getUsers(req, res) {
  try {
    const results = await fetch('https://randomuser.me/api/?results=10')
    const data = await results.json()
    return data
    
  } catch (error) {
    console.error('Error fetching users:', error);
    }
}

module.exports = getUsers
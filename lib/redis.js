const redis = require("redis")
const bcrypt = require('bcryptjs');

export async function addCoffe() {
    const client = redis.createClient({
        url: process.env.REDIS_URL
    })
    await client.connect()
    await client.incr("coffees")
    await client.disconnect()
    return {
        msg: "ok"
    }
}

export async function getCoffees() {
    const client = redis.createClient({
        url: process.env.REDIS_URL
    })
    await client.connect()
    const coffees = await client.get("coffees")
    await client.disconnect()
    return {
        coffees
    }
}

export async function validateAuth(secretPhrase) {
    const client = redis.createClient({
        url: process.env.REDIS_URL
    })
    await client.connect()
    const phrase = await client.get("authPhrase")
    await client.disconnect()

    return {
        res: await bcrypt.compare(secretPhrase, phrase)
    }
}
const சகோயமை = () => require('ipfs')
export default async () => {
  const சகோ = await சகோயமை()
  return await சகோ.create({
    relay: { enabled: true, hop: { enabled: true, active: true } },
    EXPERIMENTAL: { pubsub: true },
    repo: './ipfs'
  })
}

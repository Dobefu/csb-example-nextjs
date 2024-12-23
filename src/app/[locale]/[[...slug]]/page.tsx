export default async function Home({
  params,
}: Readonly<{
  params: Promise<{ locale: string; slug?: string[] }>
}>) {
  return <main>{`/${((await params).slug ?? []).join('/')}`}</main>
}

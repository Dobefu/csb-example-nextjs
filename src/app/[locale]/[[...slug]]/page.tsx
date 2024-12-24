export default async function Home({
  params,
}: Readonly<{
  params: Promise<{ locale: string; slug?: string[] }>
}>) {
  return <>{`/${((await params).slug ?? []).join('/')}`}</>
}

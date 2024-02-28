import ChannelGroups from '@/components/channel-groups'
// import styles from '@/styles/dashboardPage.module.css'

type DashboardParams = {
  params: {
    code: string
  }
}

async function getChannelInfo(code: string) {
  const res = await fetch(`${process.env.API_URL}/api/channel?code=${code}`)
}

export default async function DashBoardPage({ params }: DashboardParams) {
  await getChannelInfo(params.code)

  return (
    <>
      <ChannelGroups />
    </>
  )
}

'use client'

import Channel from '@/components/channel'
import styles from '@/styles/channel.module.css'

export default function ChannelGroups() {
  return (
    <menu className={styles.channelGroups}>
      <Channel
        url=""
        title="Simple javaScript"
        check={true}
        src="https://yt3.ggpht.com/ytc/AIf8zZTW1ghFBIrHx2t1Ulg-AJMgA_htLmqs5kwa8NfV=s88-c-k-c0xffffffff-no-rj-mo"
      />
      <Channel
        url=""
        title="Simple javaScript"
        check={false}
        src="https://yt3.ggpht.com/ytc/AIf8zZTW1ghFBIrHx2t1Ulg-AJMgA_htLmqs5kwa8NfV=s88-c-k-c0xffffffff-no-rj-mo"
      />
      <Channel
        url=""
        title="Simple javaScript"
        check={false}
        src="https://yt3.ggpht.com/ytc/AIf8zZTW1ghFBIrHx2t1Ulg-AJMgA_htLmqs5kwa8NfV=s88-c-k-c0xffffffff-no-rj-mo"
      />
      <Channel
        url=""
        title="Simple javaScript"
        check={false}
        src="https://yt3.ggpht.com/ytc/AIf8zZTW1ghFBIrHx2t1Ulg-AJMgA_htLmqs5kwa8NfV=s88-c-k-c0xffffffff-no-rj-mo"
      />
      <Channel
        url=""
        title="Simple javaScript"
        check={false}
        src="https://yt3.ggpht.com/ytc/AIf8zZTW1ghFBIrHx2t1Ulg-AJMgA_htLmqs5kwa8NfV=s88-c-k-c0xffffffff-no-rj-mo"
      />
    </menu>
  )
}

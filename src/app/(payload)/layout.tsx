/* THIS FILE WAS GENERATED AUTOMATICALLY BY PAYLOAD. */
import type { ServerFunctionClient } from 'payload'

import config from '@payload-config'
import '@payloadcms/next/css'
import { RootLayout } from '@payloadcms/next/layouts'
import React from 'react'

import './custom.scss'
import { importMap } from './cms/importMap'

type Args = {
  children: React.ReactNode
}

const serverFunction: ServerFunctionClient = async function (args) {
  'use server'
  const { getPayload } = await import('payload')
  const payloadInstance = await getPayload({ config })
  // Only run jobs if the jobs queue is configured
  if (payloadInstance.config?.jobs?.tasks && payloadInstance.config.jobs.tasks.length > 0) {
    return payloadInstance.jobs?.run(args as Parameters<typeof payloadInstance.jobs.run>[0])
  }
  return undefined
}

const Layout = ({ children }: Args) => (
  <RootLayout config={config} importMap={importMap} serverFunction={serverFunction}>
    {children}
  </RootLayout>
)

export default Layout

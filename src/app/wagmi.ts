'use client';
import { connectorsForWallets } from '@rainbow-me/rainbowkit';
import {
  coinbaseWallet,
  metaMaskWallet,
  phantomWallet,
  rabbyWallet,
  rainbowWallet,
  walletConnectWallet,
} from '@rainbow-me/rainbowkit/wallets';
import { useMemo } from 'react';
import { http, createConfig } from 'wagmi';
import { base } from 'wagmi/chains';
import { walletConnectProjectId } from './config';

export function useWagmiConfig() {
  const projectId = walletConnectProjectId ?? '';
  if (!projectId) {
    const providerErrMessage =
      'Provide a NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID';
    throw new Error(providerErrMessage);
  }

  return useMemo(() => {
    const connectors = connectorsForWallets(
      [
        {
          groupName: 'Recommended Wallet',
          wallets: [coinbaseWallet],
        },
        {
          groupName: 'Other Wallets',
          wallets: [metaMaskWallet,rainbowWallet, rabbyWallet, walletConnectWallet, phantomWallet],
        },
      ],
      {
        appName: 'onchainkit',
        projectId,
      },
    );

    const wagmiConfig = createConfig({
      chains: [base],
      
      // turn off injected provider discovery
      multiInjectedProviderDiscovery: false,
      connectors,
      ssr: true,
      transports: {
        [base.id]: http(),
      },
    });

    console.log('Connectors:', wagmiConfig.connectors);


    return wagmiConfig;
  }, [projectId]);
}

'use strict';
const moment = require("moment");
module.exports = {
    async up(queryInterface, Sequelize) {
        let sourceList = [
            {
                url: 'https://decrypt.co',
                key: 'decrypt.co',
                rss_path: '/feed',
                name: 'Decrypt',
            },
            {
                url: 'https://en.cryptonomist.ch',
                key: 'en.cryptonomist.ch',
                rss_path: '/feed',
                name: 'Cryptoconomist',
            },
            {
                url: 'https://ambcrypto.com',
                key: 'ambcrypto.com',
                rss_path: '/feed',
                name: 'Ambcrypto',
            },
            {
                url: 'https://tokenhell.com',
                key: 'tokenhell.com',
                rss_path: '/feed',
                name: 'Tokenhell',
            },
            {
                url: 'https://insidebitcoins.com',
                key: 'insidebitcoins.com',
                rss_path: '/feed',
                name: 'Inside Bitcoins',
            },
            {
                url: 'https://bitcoinist.com',
                key: 'bitcoinist.com',
                rss_path: '/feed',
                name: 'Bitcoinist',
            },
            {
                url: 'https://coinfomania.com',
                key: 'coinfomania.com',
                rss_path: '/feed',
                name: 'Coinfomania',
            },
            {
                url: 'https://coinjournal.net',
                key: 'coinjournal.net',
                rss_path: '/feed',
                name: 'Coin Journal',
            },
            {
                url: 'https://btcmanager.com',
                key: 'btcmanager.com',
                rss_path: '/feed',
                name: 'Btc Manager',
            },
            {
                url: 'https://coingeek.com',
                key: 'coingeek.com',
                rss_path: '/feed',
                name: 'CoinGeek',
            },
            {
                url: 'https://cryptonews.com',
                key: 'cryptonews.com',
                rss_path: '/news/feed',
                name: 'Crypto News',
            },
            {
                url: 'https://ihodl.com',
                key: 'ihodl.com',
                rss_path: '/feed/default',
                name: 'Ihodl',
            },
            {
                url: 'https://oracletimes.com',
                key: 'oracletimes.com',
                rss_path: '/feed',
                name: 'Oracle Times',
            },
            {
                url: 'https://news.bitcoin.com',
                key: 'news.bitcoin.com',
                rss_path: '/feed',
                name: 'News Bitcoin',
            },
            {
                url: 'https://cointelegraph.com',
                key: 'cointelegraph.com',
                rss_path: '/feed',
                name: 'Cointelegraf',
            },
            {
                url: 'https://beincrypto.com',
                key: 'beincrypto.com',
                rss_path: '/feed',
                name: 'Be in crypto',
            },
            {
                url: 'https://cryptobriefing.com',
                key: 'cryptobriefing.com',
                rss_path: '/feed',
                name: 'Crypto briefing',
            },
            {
                url: 'https://coinpedia.org',
                key: 'coinpedia.org',
                rss_path: '/feed',
                name: 'Coinpedia',
            },
            {
                url: 'https://coinnounce.com',
                key: 'coinnounce.com',
                rss_path: '/feed',
                name: 'Coin nounce',
            },
            {
                url: 'http://feeds.feedburner.com',
                key: 'feeds.feedburner.com',
                rss_path: '/kryptomoney',
                name: 'Feedburner feeds',
            },
            {
                url: 'https://ourbitcoinnews.com',
                key: 'ourbitcoinnews.com',
                rss_path: '/feed',
                name: 'Our Bitcoin news',
            },
            {
                url: 'https://blokt.com',
                key: 'blokt.com',
                rss_path: '/feed',
                name: 'Blokt',
            },
            {
                url: 'https://cryptoslate.com',
                key: 'cryptoslate.com',
                rss_path: '/feed',
                name: 'Crypto slate',
            },
            {
                url: 'http://www.newsbtc.com',
                key: 'www.newsbtc.com',
                rss_path: '/feed',
                name: 'News btc',
            },
            {
                url: 'https://usethebitcoin.com',
                key: 'usethebitcoin.com',
                rss_path: '/feed',
                name: 'Use the Bitcoin',
            },
            {
                url: 'https://coingape.com',
                key: 'coingape.com',
                rss_path: '/feed',
                name: 'Coin page',
            },
            {
                url: 'https://altcoinbuzz.io',
                key: 'altcoinbuzz.io',
                rss_path: '/feed',
                name: 'Altcoin buzz',
            },
            {
                url: 'https://thetokenist.io',
                key: 'thetokenist.io',
                rss_path: '/feed',
                name: 'The tokenist',
            },
            {
                url: 'https://www.financemagnates.com',
                key: 'www.financemagnates.com',
                rss_path: '/feed',
                name: 'Finance magnets',
            },
            {
                url: 'https://zycrypto.com',
                key: 'zycrypto.com',
                rss_path: '/feed',
                name: 'Zycrypto'
            },
            {
                url: 'https://hackernoon.com',
                key: 'hackernoon.com',
                rss_path: '/feed',
                name: 'Hackermoon'
            },
            {
                url: 'https://cryptodaily.co.uk',
                key: 'cryptodaily.co.uk',
                rss_path: '/feed',
                name: 'Crypto daily'
            },
            {
                url: 'https://www.koinalert.com',
                key: 'www.koinalert.com',
                rss_path: '/feed',
                name: 'Koin alert'
            },
            {
                url: 'https://bitcoinmagazine.com',
                key: 'bitcoinmagazine.com',
                rss_path: '/feed',
                name: 'Bitcoin magazine'
            },
        ]
        const sourceExistList = await queryInterface.rawSelect('news_source',
            {
                plain: false
            }, [])
        const sourceExistKeyList = sourceExistList.map(source => source.key)
        sourceList = sourceList
            .filter(source => !sourceExistKeyList.includes(source.key))
            .map(source => {
                return {
                    ...source,
                    updated_at: moment().toDate(),
                    created_at: moment().toDate(),
                }
            })
        if (sourceList.length !== 0) {
            await queryInterface.bulkInsert('news_source', [...sourceList])
        }
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('news_source', null, {});
    }
};

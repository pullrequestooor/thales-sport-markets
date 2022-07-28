import {
    MatchInfo,
    MatchInfoColumn,
    MatchInfoLabel,
    MatchParticipantImage,
    MatchParticipantImageContainer,
    MatchParticipantName,
    MatchVSLabel,
    OddsLabel,
} from 'components/common';
import Tags from 'pages/Markets/components/Tags';
import React, { useEffect, useState } from 'react';
// import { useTranslation } from 'react-i18next';
import { SportMarketInfo } from 'types/markets';
import { getTeamImageSource, OVERTIME_LOGO } from 'utils/images';

type MarketCardMaturedProps = {
    market: SportMarketInfo;
};

const MarketCardMatured: React.FC<MarketCardMaturedProps> = ({ market }) => {
    // const { t } = useTranslation();
    const noOdds = market.awayOdds == 0 && market.homeOdds == 0 && market.awayOdds == 0;

    const [homeLogoSrc, setHomeLogoSrc] = useState(getTeamImageSource(market.homeTeam, market.tags[0]));
    const [awayLogoSrc, setAwayLogoSrc] = useState(getTeamImageSource(market.awayTeam, market.tags[0]));

    useEffect(() => {
        setHomeLogoSrc(getTeamImageSource(market.homeTeam, market.tags[0]));
        setAwayLogoSrc(getTeamImageSource(market.awayTeam, market.tags[0]));
    }, [market.homeTeam, market.awayTeam]);

    return (
        <MatchInfo>
            <MatchInfoColumn>
                <MatchParticipantImageContainer>
                    <MatchParticipantImage src={homeLogoSrc} onError={() => setHomeLogoSrc(OVERTIME_LOGO)} />
                </MatchParticipantImageContainer>
                <OddsLabel noOdds={market.awayOdds == 0 && market.homeOdds == 0} homeOdds={true}>
                    {market.homeOdds.toFixed(2)}
                </OddsLabel>
                <MatchParticipantName>{market.homeTeam}</MatchParticipantName>
            </MatchInfoColumn>
            <MatchInfoColumn>
                <MatchInfoLabel pendingResolution={noOdds} isMaturedMarket={true}>
                    {'PENDING RESOLUTION'}
                </MatchInfoLabel>
                <MatchVSLabel pendingResolution={noOdds}>VS</MatchVSLabel>
                <OddsLabel
                    noOdds={noOdds}
                    isTwoPositioned={market.drawOdds === 0 && !(market.awayOdds == 0 && market.homeOdds == 0)}
                    isDraw={true}
                >
                    {market.drawOdds.toFixed(2)}
                </OddsLabel>
                <MatchParticipantName isTwoPositioned={market.drawOdds === 0}>{'DRAW'}</MatchParticipantName>
                <Tags sport={market.sport} tags={market.tags} />
            </MatchInfoColumn>
            <MatchInfoColumn>
                <MatchParticipantImageContainer>
                    <MatchParticipantImage src={awayLogoSrc} onError={() => setAwayLogoSrc(OVERTIME_LOGO)} />
                </MatchParticipantImageContainer>
                <OddsLabel noOdds={market.awayOdds == 0 && market.homeOdds == 0} homeOdds={false}>
                    {market.awayOdds.toFixed(2)}
                </OddsLabel>
                <MatchParticipantName>{market.awayTeam}</MatchParticipantName>
            </MatchInfoColumn>
        </MatchInfo>
    );
};

export default MarketCardMatured;

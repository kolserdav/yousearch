import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import * as srv from '../services';
import Theme from '../components/Theme';
import { store, action } from '../store';
import Alert from '../components/ui/Alert';
import Grid from '../components/ui/Grid';
import { H1 } from '../components/ui/Typography';
import { NextComponentType, GetServerSidePropsContext } from 'next';

interface ConfirmStaticProps {
  props: ConfirmProps;
}

const Confirm: NextComponentType<any, any, ConfirmProps> = (props) => {
  const router = useRouter();
  const { e } = router.query;
  const { result, message, t } = props;
  return (
    <Theme>
      <Grid direction="column" align="center">
        <H1>
          {t.interface.confirmEmail}:&nbsp;{e}
        </H1>
        <br />
        <Alert relative={true} open={true} text={message} status={result} />
        <br />
        <Link href="/">
          <a style={{ textTransform: 'uppercase', margin: '100px' }}>{t.interface.home}</a>
        </Link>
      </Grid>
    </Theme>
  );
};

export async function getServerSideProps(
  ctx: GetServerSidePropsContext
): Promise<ConfirmStaticProps> {
  const { locale, query }: any = ctx;
  const { e, k }: Query = query;
  const lang = srv.getLang(locale);
  const confirmRes = await new Promise<ConfirmProps>((resolve) => {
    const storeSubs = store.subscribe(() => {
      const state: Action<any> = store.getState();
      if (state.type === 'CONFIRM') {
        storeSubs();
        const { body }: Action<Schema.Values.ConfirmRequest> = state;
        const { confirm } = body;
        if (!confirm) {
          resolve({
            t: lang,
            result: 'error',
            message: 'err',
          });
        }
        resolve({
          t: lang,
          result: confirm.result,
          message: confirm.message,
        });
      }
    });
    action({
      type: 'CONFIRM_REQUEST',
      body: {
        input: {
          email: e,
          key: k,
        },
        results: ['message'],
      },
    });
  });
  return {
    props: confirmRes,
  };
}

export default Confirm;

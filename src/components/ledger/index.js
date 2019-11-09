import React, { useState, useEffect }  from 'react';
import PropTypes from 'prop-types';
import { withAuth } from '@okta/okta-react';


const LedgerPage = (props)=> <h1>Hello From Ledger</h1>;

export default withAuth(LedgerPage);


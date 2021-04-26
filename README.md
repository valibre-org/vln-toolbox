## VLN Toolbox

Scripts to help with setting up an xcm testing environment and perform basic tests for VLN parachains

### How to use

1. Clone and build `vln-node`, `polkadot` and `acala`
2. Clone `vln-toolbox` in same dir as above projects
3. Run `yarn install` to install all dependencies
4. Run `node onboarding.js` - this will deploy the test network, onboard vln and acala parchains and open hrmp channel between acala and vln.
5. Run `node transferFromAcala.js` to test xcm asset transfer.

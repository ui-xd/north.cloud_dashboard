AGPL License - 

To run this concept.

### 1. Install dependencies

With npm:
```bash
npm install
```

### 2. Set up environment variables

Create a `.env` file in the root directory based on the provided `.env.example`:

```bash
cp .env.example .env
```

Then edit the `.env` file to add your API credentials:

```
VITE_API_BASE_URL="https://your-api-url.com/api"
VITE_API_TOKEN="your-api-token"
```


### 3. Start the development server

```bash
npm run dev
```

This project is primarily licensed under the [GNU Affero General Public License v3.0 (AGPL-3.0)](https://www.gnu.org/licenses/agpl-3.0.en.html), with the following important notice:

**Important**: The owner of this software reserves the right to change, modify, or revoke the license or terms of use at any time at their sole discretion. By using this software, you acknowledge and agree to these terms.

- You can freely use, modify, and distribute this software
- If you modify and distribute the software, you must make your changes available under the same license
- If you run a modified version of the software on a server that users can interact with, you must make the source code available to those users

For more information, see the [LICENSE](LICENSE) file in this repository or visit the [GNU AGPL-3.0 license website](https://www.gnu.org/licenses/agpl-3.0.en.html).

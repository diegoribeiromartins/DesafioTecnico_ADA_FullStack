import connect, { IN_MEMORY } from "@databases/sqlite";

export default connect(IN_MEMORY, { verbose: true });

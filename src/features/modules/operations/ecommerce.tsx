"use client";
import { useState } from "react";
import {
  sampleProducts,
  sampleOrders,
  createProductCopies,
} from "@/demo/modules/operations";
import {
  ModuleFrame,
  Panel,
  Catalog,
  Input,
  Select,
  Editor,
  Disconnected,
  Notice,
  Tabs,
  TableWrap,
} from "../shared/module-ui";
import { SampleArt } from "../shared/sample-art";
import type { SampleProduct } from "@/types/modules";
export function Ecommerce() {
  const [products, setProducts] = useState([...sampleProducts]);
  const [selected, setSelected] = useState("product-1");
  const [query, setQuery] = useState("");
  const [descriptions, setDescriptions] = useState(createProductCopies);
  const description = descriptions[selected];
  function setDescription(value: string) {
    setDescriptions((old) => ({ ...old, [selected]: value }));
  }
  const product = products.find((p) => p.id === selected)!;
  function edit<K extends keyof SampleProduct>(
    key: K,
    value: SampleProduct[K],
  ) {
    setProducts((old) =>
      old.map((p) => (p.id === selected ? { ...p, [key]: value } : p)),
    );
  }
  const invalidStock = products.some(
    (p) => !Number.isInteger(p.stock) || p.stock < 0 || p.stock > 9999,
  );
  const total = products.reduce((sum, p) => sum + p.stock, 0);
  return (
    <ModuleFrame
      slug="ecommerce"
      tagline="Shape your storefront before connecting commerce."
      related={["image-studio", "documents", "crm"]}
    >
      <div className="tool-metrics">
        <div className="tool-metric">
          <span>Fictional catalog</span>
          <strong>{products.length}</strong>
          <small>Sample product concepts</small>
        </div>
        <div className="tool-metric">
          <span>Illustrative inventory</span>
          <strong>{invalidStock ? "Invalid draft" : total}</strong>
          <small>Local sample units, never actual stock</small>
        </div>
        <div className="tool-metric">
          <span>Connected stores</span>
          <strong>0</strong>
          <small>No orders or charges are processed</small>
        </div>
      </div>
      <div className="tool-split">
        <Panel title="Product catalog">
          <Input
            label="Search sample products"
            value={query}
            onChange={setQuery}
          />
          <Catalog
            title="Sample product concepts"
            items={products.filter((p) =>
              p.name.toLowerCase().includes(query.toLowerCase()),
            )}
            selected={selected}
            onSelect={setSelected}
          />
          <SampleArt
            name={product.name}
            palette="peach"
            variant={products.indexOf(product)}
          />
          <p>Fixed vector illustration; not an actual product photograph.</p>
        </Panel>
        <Panel
          title="Sample product editor"
          kicker="UNSAVED / NOT ACTUAL INVENTORY"
        >
          <Input
            label="Product name"
            value={product.name}
            onChange={(value) => edit("name", value)}
          />
          <Select
            label="Product category"
            value={product.category}
            onChange={(value) => edit("category", value)}
            options={["Stationery", "Objects", "Prints"]}
          />
          <Input
            label="Illustrative stock count"
            value={product.stock}
            onChange={(value) => edit("stock", Number(value))}
            type="number"
            min={0}
            max={9999}
            error={
              !Number.isInteger(product.stock) ||
              product.stock < 0 ||
              product.stock > 9999
                ? "Use a whole sample count between 0 and 9,999."
                : undefined
            }
          />
          <Editor
            label="Product description draft"
            value={description}
            onChange={setDescription}
          />
          <div className="content-post-preview">
            <span className="tool-mini-badge">LOCAL COPY PREVIEW</span>
            <p className="tool-preview-copy">{description}</p>
          </div>
          <Notice>
            Edits are local only. No real product, stock level or storefront
            changes.
          </Notice>
          <Disconnected action="Publish product" />
        </Panel>
      </div>
      <Panel title="Commerce desk">
        <Tabs
          label="Commerce information"
          items={[
            {
              id: "orders",
              label: "Sample orders",
              content: (
                <TableWrap label="Fictional order table">
                  <table>
                    <caption>
                      Fixed fictional examples — no actual orders exist
                    </caption>
                    <thead>
                      <tr>
                        <th scope="col">Sample ID</th>
                        <th scope="col">Product</th>
                        <th scope="col">Quantity example</th>
                        <th scope="col">Status example</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sampleOrders.map((o) => (
                        <tr key={o.id}>
                          <th scope="row">{o.id}</th>
                          <td>{o.product}</td>
                          <td>{o.quantity}</td>
                          <td>{o.status}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </TableWrap>
              ),
            },
            {
              id: "connections",
              label: "Store connections",
              content: (
                <div className="channel-cards">
                  {["Store platform", "Payments", "Shipping"].map((s) => (
                    <div key={s}>
                      <strong>{s} · Not connected</strong>
                      <Disconnected action={`Connect ${s.toLowerCase()}`} />
                    </div>
                  ))}
                </div>
              ),
            },
          ]}
        />
      </Panel>
    </ModuleFrame>
  );
}

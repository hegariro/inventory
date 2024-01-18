--
-- Name: users; Type: TABLE; Schema: public; Owner: toor
--

CREATE TABLE public.users (
    id uuid NOT NULL,
    firstname character varying(255) NOT NULL,
    lastname character varying(255) NOT NULL,
    rol public.role DEFAULT 'customer'::public.role NOT NULL,
    nickname character varying(255) NOT NULL,
    passwd character varying(255) NOT NULL,
    created_at date DEFAULT CURRENT_DATE NOT NULL,
    updated_at date DEFAULT CURRENT_DATE NOT NULL
);

ALTER TABLE public.users OWNER TO toor;

--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: toor
--

COPY public.users (id, firstname, lastname, rol, nickname, passwd, created_at, updated_at) FROM stdin;
23a304e2-67ba-43c6-8a42-59acd1a3c005	Gabriel	Guanabanas	administrator	gabotest$2a$08$u4WMcC7fwpSdEvQI0zqN9uHz9kkV9qHzMknwOh3raIAi7Ad6PhaLq	2024-01-18	2024-01-18
\.

--
-- Name: users user_pkey; Type: CONSTRAINT; Schema: public; Owner: toor
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);


--
-- Name: products; Type: TABLE; Schema: public; Owner: toor
--

CREATE TABLE public.products (
    id uuid NOT NULL,
    lot_number character varying(9) NOT NULL,
    name character varying(255) NOT NULL,
    price numeric(12,2) DEFAULT 0.0 NOT NULL,
    quantity smallint DEFAULT 0 NOT NULL,
    admission_date date NOT NULL,
    created_at date NOT NULL,
    updated_at date NOT NULL
);


ALTER TABLE public.products OWNER TO toor;

--
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: toor
--

COPY public.products (id, lot_number, name, price, quantity, admission_date, created_at, updated_at) FROM stdin;
b41fb5b6-f445-4a64-ac80-a996ffb2bd26	12340	test product num one	12500.00	200	2024-01-18	2024-01-18	2024-01-18
\.


--
-- Name: products products_pkey; Type: CONSTRAINT; Schema: public; Owner: toor
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (id);


--
-- Name: purchase_orders; Type: TABLE; Schema: public; Owner: toor
--

CREATE TABLE public.purchase_orders (
    id uuid NOT NULL,
    product_id uuid NOT NULL,
    quantity smallint NOT NULL,
    subtotal numeric(12,2) NOT NULL,
    created_at date DEFAULT CURRENT_DATE,
    updated_at date DEFAULT CURRENT_DATE
);


ALTER TABLE public.purchase_orders OWNER TO toor;

--
-- Name: purchase_orders purchase_orders_pkey; Type: CONSTRAINT; Schema: public; Owner: toor
--

ALTER TABLE ONLY public.purchase_orders
    ADD CONSTRAINT purchase_orders_pkey PRIMARY KEY (id);


--
-- Name: purchase_orders fk_product; Type: FK CONSTRAINT; Schema: public; Owner: toor
--

ALTER TABLE ONLY public.purchase_orders
    ADD CONSTRAINT fk_product FOREIGN KEY (product_id) REFERENCES public.products(id);


--
-- Name: purchases; Type: TABLE; Schema: public; Owner: toor
--

CREATE TABLE public.purchases (
    id uuid NOT NULL,
    purchase_date date NOT NULL,
    user_id uuid NOT NULL,
    purchase_orders json,
    quantity_products smallint,
    total_price numeric(13,2),
    created_at date DEFAULT CURRENT_DATE,
    updated_at date DEFAULT CURRENT_DATE
);


ALTER TABLE public.purchases OWNER TO toor;

--
-- Name: purchases purchases_pkey; Type: CONSTRAINT; Schema: public; Owner: toor
--

ALTER TABLE ONLY public.purchases
    ADD CONSTRAINT purchases_pkey PRIMARY KEY (id);


--
-- Name: purchases fk_purchases_users; Type: FK CONSTRAINT; Schema: public; Owner: toor
--

ALTER TABLE ONLY public.purchases
    ADD CONSTRAINT fk_purchases_users FOREIGN KEY (user_id) REFERENCES public.users(id);

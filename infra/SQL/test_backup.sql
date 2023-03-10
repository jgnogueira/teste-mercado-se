PGDMP     #    7                {            test_mercado    15.2    15.2 <    E           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            F           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            G           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            H           1262    16614    test_mercado    DATABASE     ?   CREATE DATABASE test_mercado WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Portuguese_Brazil.1252';
    DROP DATABASE test_mercado;
                postgres    false            ?            1259    16556 
   tbcarrinho    TABLE     ?   CREATE TABLE public.tbcarrinho (
    id bigint NOT NULL,
    id_produto bigint NOT NULL,
    id_usuario bigint NOT NULL,
    quantidade integer NOT NULL,
    data_cadastro timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
    DROP TABLE public.tbcarrinho;
       public         heap    postgres    false            ?            1259    16555    tbcarrinho_id_seq    SEQUENCE     z   CREATE SEQUENCE public.tbcarrinho_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.tbcarrinho_id_seq;
       public          postgres    false    223            I           0    0    tbcarrinho_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.tbcarrinho_id_seq OWNED BY public.tbcarrinho.id;
          public          postgres    false    222            ?            1259    16587    tbdados_vendas    TABLE     ?  CREATE TABLE public.tbdados_vendas (
    id bigint NOT NULL,
    id_venda bigint NOT NULL,
    id_produto bigint NOT NULL,
    valor_unitario numeric NOT NULL,
    porcentagem_imposto integer NOT NULL,
    quantidade integer NOT NULL,
    data_cadastro timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
 "   DROP TABLE public.tbdados_vendas;
       public         heap    postgres    false            ?            1259    16586    tbdados_vendas_id_seq    SEQUENCE     ~   CREATE SEQUENCE public.tbdados_vendas_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ,   DROP SEQUENCE public.tbdados_vendas_id_seq;
       public          postgres    false    227            J           0    0    tbdados_vendas_id_seq    SEQUENCE OWNED BY     O   ALTER SEQUENCE public.tbdados_vendas_id_seq OWNED BY public.tbdados_vendas.id;
          public          postgres    false    226            ?            1259    16531    tbimposto_tipos_produto    TABLE     ?   CREATE TABLE public.tbimposto_tipos_produto (
    id bigint NOT NULL,
    id_tipo bigint NOT NULL,
    porcentagem_imposto integer NOT NULL,
    data_cadastro timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
 +   DROP TABLE public.tbimposto_tipos_produto;
       public         heap    postgres    false            ?            1259    16530    tbimposto_tipos_produto_id_seq    SEQUENCE     ?   CREATE SEQUENCE public.tbimposto_tipos_produto_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 5   DROP SEQUENCE public.tbimposto_tipos_produto_id_seq;
       public          postgres    false    221            K           0    0    tbimposto_tipos_produto_id_seq    SEQUENCE OWNED BY     a   ALTER SEQUENCE public.tbimposto_tipos_produto_id_seq OWNED BY public.tbimposto_tipos_produto.id;
          public          postgres    false    220            ?            1259    16520 
   tbprodutos    TABLE       CREATE TABLE public.tbprodutos (
    id bigint NOT NULL,
    id_tipo bigint NOT NULL,
    nome character varying(200) NOT NULL,
    imagem character varying(200) NOT NULL,
    valor numeric NOT NULL,
    data_cadastro timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
    DROP TABLE public.tbprodutos;
       public         heap    postgres    false            ?            1259    16519    tbprodutos_id_seq    SEQUENCE     z   CREATE SEQUENCE public.tbprodutos_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.tbprodutos_id_seq;
       public          postgres    false    219            L           0    0    tbprodutos_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.tbprodutos_id_seq OWNED BY public.tbprodutos.id;
          public          postgres    false    218            ?            1259    16449    tbtipos_produto    TABLE     ?   CREATE TABLE public.tbtipos_produto (
    id bigint NOT NULL,
    nome character varying(100) NOT NULL,
    data_cadastro timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
 #   DROP TABLE public.tbtipos_produto;
       public         heap    postgres    false            ?            1259    16448    tbtipos_produto_id_seq    SEQUENCE        CREATE SEQUENCE public.tbtipos_produto_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public.tbtipos_produto_id_seq;
       public          postgres    false    217            M           0    0    tbtipos_produto_id_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public.tbtipos_produto_id_seq OWNED BY public.tbtipos_produto.id;
          public          postgres    false    216            ?            1259    16400 
   tbusuarios    TABLE     s  CREATE TABLE public.tbusuarios (
    id bigint NOT NULL,
    nome character varying(200) NOT NULL,
    senha character varying(200) NOT NULL,
    email character varying(200) NOT NULL,
    data_cadastro timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    data_ultimo_acesso timestamp without time zone,
    administrador boolean DEFAULT false NOT NULL
);
    DROP TABLE public.tbusuarios;
       public         heap    postgres    false            ?            1259    16399    tbusuarios_id_seq    SEQUENCE     z   CREATE SEQUENCE public.tbusuarios_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.tbusuarios_id_seq;
       public          postgres    false    215            N           0    0    tbusuarios_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.tbusuarios_id_seq OWNED BY public.tbusuarios.id;
          public          postgres    false    214            ?            1259    16574    tbvendas    TABLE     ?   CREATE TABLE public.tbvendas (
    id bigint NOT NULL,
    id_usuario bigint NOT NULL,
    data_cadastro timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
    DROP TABLE public.tbvendas;
       public         heap    postgres    false            ?            1259    16573    tbvendas_id_seq    SEQUENCE     x   CREATE SEQUENCE public.tbvendas_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.tbvendas_id_seq;
       public          postgres    false    225            O           0    0    tbvendas_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.tbvendas_id_seq OWNED BY public.tbvendas.id;
          public          postgres    false    224            ?           2604    16559    tbcarrinho id    DEFAULT     n   ALTER TABLE ONLY public.tbcarrinho ALTER COLUMN id SET DEFAULT nextval('public.tbcarrinho_id_seq'::regclass);
 <   ALTER TABLE public.tbcarrinho ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    223    222    223            ?           2604    16590    tbdados_vendas id    DEFAULT     v   ALTER TABLE ONLY public.tbdados_vendas ALTER COLUMN id SET DEFAULT nextval('public.tbdados_vendas_id_seq'::regclass);
 @   ALTER TABLE public.tbdados_vendas ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    227    226    227            ?           2604    16534    tbimposto_tipos_produto id    DEFAULT     ?   ALTER TABLE ONLY public.tbimposto_tipos_produto ALTER COLUMN id SET DEFAULT nextval('public.tbimposto_tipos_produto_id_seq'::regclass);
 I   ALTER TABLE public.tbimposto_tipos_produto ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    221    220    221            ?           2604    16523    tbprodutos id    DEFAULT     n   ALTER TABLE ONLY public.tbprodutos ALTER COLUMN id SET DEFAULT nextval('public.tbprodutos_id_seq'::regclass);
 <   ALTER TABLE public.tbprodutos ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    219    218    219            ?           2604    16452    tbtipos_produto id    DEFAULT     x   ALTER TABLE ONLY public.tbtipos_produto ALTER COLUMN id SET DEFAULT nextval('public.tbtipos_produto_id_seq'::regclass);
 A   ALTER TABLE public.tbtipos_produto ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    217    216    217            ?           2604    16403    tbusuarios id    DEFAULT     n   ALTER TABLE ONLY public.tbusuarios ALTER COLUMN id SET DEFAULT nextval('public.tbusuarios_id_seq'::regclass);
 <   ALTER TABLE public.tbusuarios ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    215    214    215            ?           2604    16577    tbvendas id    DEFAULT     j   ALTER TABLE ONLY public.tbvendas ALTER COLUMN id SET DEFAULT nextval('public.tbvendas_id_seq'::regclass);
 :   ALTER TABLE public.tbvendas ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    225    224    225            >          0    16556 
   tbcarrinho 
   TABLE DATA                 public          postgres    false    223   ?D       B          0    16587    tbdados_vendas 
   TABLE DATA                 public          postgres    false    227   ?D       <          0    16531    tbimposto_tipos_produto 
   TABLE DATA                 public          postgres    false    221   ?E       :          0    16520 
   tbprodutos 
   TABLE DATA                 public          postgres    false    219   iF       8          0    16449    tbtipos_produto 
   TABLE DATA                 public          postgres    false    217   ?G       6          0    16400 
   tbusuarios 
   TABLE DATA                 public          postgres    false    215   `H       @          0    16574    tbvendas 
   TABLE DATA                 public          postgres    false    225   ?I       P           0    0    tbcarrinho_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.tbcarrinho_id_seq', 21, true);
          public          postgres    false    222            Q           0    0    tbdados_vendas_id_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.tbdados_vendas_id_seq', 8, true);
          public          postgres    false    226            R           0    0    tbimposto_tipos_produto_id_seq    SEQUENCE SET     L   SELECT pg_catalog.setval('public.tbimposto_tipos_produto_id_seq', 9, true);
          public          postgres    false    220            S           0    0    tbprodutos_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.tbprodutos_id_seq', 8, true);
          public          postgres    false    218            T           0    0    tbtipos_produto_id_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public.tbtipos_produto_id_seq', 8, true);
          public          postgres    false    216            U           0    0    tbusuarios_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.tbusuarios_id_seq', 5, true);
          public          postgres    false    214            V           0    0    tbvendas_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.tbvendas_id_seq', 6, true);
          public          postgres    false    224            ?           2606    16561    tbcarrinho pk_carrinho 
   CONSTRAINT     T   ALTER TABLE ONLY public.tbcarrinho
    ADD CONSTRAINT pk_carrinho PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.tbcarrinho DROP CONSTRAINT pk_carrinho;
       public            postgres    false    223            ?           2606    16594    tbdados_vendas pk_dados_vendas 
   CONSTRAINT     \   ALTER TABLE ONLY public.tbdados_vendas
    ADD CONSTRAINT pk_dados_vendas PRIMARY KEY (id);
 H   ALTER TABLE ONLY public.tbdados_vendas DROP CONSTRAINT pk_dados_vendas;
       public            postgres    false    227            ?           2606    16536 '   tbimposto_tipos_produto pk_imposto_tipo 
   CONSTRAINT     e   ALTER TABLE ONLY public.tbimposto_tipos_produto
    ADD CONSTRAINT pk_imposto_tipo PRIMARY KEY (id);
 Q   ALTER TABLE ONLY public.tbimposto_tipos_produto DROP CONSTRAINT pk_imposto_tipo;
       public            postgres    false    221            ?           2606    16527    tbprodutos pk_produto 
   CONSTRAINT     S   ALTER TABLE ONLY public.tbprodutos
    ADD CONSTRAINT pk_produto PRIMARY KEY (id);
 ?   ALTER TABLE ONLY public.tbprodutos DROP CONSTRAINT pk_produto;
       public            postgres    false    219            ?           2606    16579    tbvendas pk_vendas 
   CONSTRAINT     P   ALTER TABLE ONLY public.tbvendas
    ADD CONSTRAINT pk_vendas PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.tbvendas DROP CONSTRAINT pk_vendas;
       public            postgres    false    225            ?           2606    16454 $   tbtipos_produto tbtipos_produto_pkey 
   CONSTRAINT     b   ALTER TABLE ONLY public.tbtipos_produto
    ADD CONSTRAINT tbtipos_produto_pkey PRIMARY KEY (id);
 N   ALTER TABLE ONLY public.tbtipos_produto DROP CONSTRAINT tbtipos_produto_pkey;
       public            postgres    false    217            ?           2606    16407    tbusuarios tbusuarios_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.tbusuarios
    ADD CONSTRAINT tbusuarios_pkey PRIMARY KEY (id);
 D   ALTER TABLE ONLY public.tbusuarios DROP CONSTRAINT tbusuarios_pkey;
       public            postgres    false    215            ?           2606    16562    tbcarrinho carrinho_produto    FK CONSTRAINT     ?   ALTER TABLE ONLY public.tbcarrinho
    ADD CONSTRAINT carrinho_produto FOREIGN KEY (id_produto) REFERENCES public.tbprodutos(id);
 E   ALTER TABLE ONLY public.tbcarrinho DROP CONSTRAINT carrinho_produto;
       public          postgres    false    3223    223    219            ?           2606    16567    tbcarrinho carrinho_usuario    FK CONSTRAINT     ?   ALTER TABLE ONLY public.tbcarrinho
    ADD CONSTRAINT carrinho_usuario FOREIGN KEY (id_usuario) REFERENCES public.tbusuarios(id);
 E   ALTER TABLE ONLY public.tbcarrinho DROP CONSTRAINT carrinho_usuario;
       public          postgres    false    223    215    3219            ?           2606    16595    tbdados_vendas dados_vendas    FK CONSTRAINT     ~   ALTER TABLE ONLY public.tbdados_vendas
    ADD CONSTRAINT dados_vendas FOREIGN KEY (id_venda) REFERENCES public.tbvendas(id);
 E   ALTER TABLE ONLY public.tbdados_vendas DROP CONSTRAINT dados_vendas;
       public          postgres    false    227    3229    225            ?           2606    16600 #   tbdados_vendas dados_vendas_produto    FK CONSTRAINT     ?   ALTER TABLE ONLY public.tbdados_vendas
    ADD CONSTRAINT dados_vendas_produto FOREIGN KEY (id_produto) REFERENCES public.tbprodutos(id);
 M   ALTER TABLE ONLY public.tbdados_vendas DROP CONSTRAINT dados_vendas_produto;
       public          postgres    false    227    219    3223            ?           2606    16537 $   tbimposto_tipos_produto imposto_tipo    FK CONSTRAINT     ?   ALTER TABLE ONLY public.tbimposto_tipos_produto
    ADD CONSTRAINT imposto_tipo FOREIGN KEY (id_tipo) REFERENCES public.tbtipos_produto(id);
 N   ALTER TABLE ONLY public.tbimposto_tipos_produto DROP CONSTRAINT imposto_tipo;
       public          postgres    false    3221    217    221            ?           2606    16542    tbprodutos produto_tipo    FK CONSTRAINT     ?   ALTER TABLE ONLY public.tbprodutos
    ADD CONSTRAINT produto_tipo FOREIGN KEY (id_tipo) REFERENCES public.tbtipos_produto(id) NOT VALID;
 A   ALTER TABLE ONLY public.tbprodutos DROP CONSTRAINT produto_tipo;
       public          postgres    false    3221    219    217            ?           2606    16580    tbvendas vendas_usuario    FK CONSTRAINT     ~   ALTER TABLE ONLY public.tbvendas
    ADD CONSTRAINT vendas_usuario FOREIGN KEY (id_usuario) REFERENCES public.tbusuarios(id);
 A   ALTER TABLE ONLY public.tbvendas DROP CONSTRAINT vendas_usuario;
       public          postgres    false    225    215    3219            >   
   x???          B   ?   x???=KA??~?tQ?,;??????`?mH<?@0B???ܞ???3S>????Uw??~??????a?d?v?v8?6?/???7??
????~m3??sKs??)ۘ1ǒpv?h??T4??N?.?^D?p.\P???>??#f	&ڄ???[?3v?$&a????U???G#LR???kr???pD??C??&?A?V?k-̡Ύ??K?{?v?y???)p??      <   ?   x???=?P???Oq6?r?9y_ljp? ?U???R???ա!Zx?????se՜`???Ч??{y??!|;>?m???㥨a?dP
?I'?2?:'?3?L?4??}T?ok3??6)eHW?F?^ҿh?ʹUF????`?C@?yiə?3Eo??e?      :   "  x???Mk1໿"?ma]2?L&ٞ?݃P,Զ?l??֕???7???P^????????M?o/b?o?u??v?=??8?????{?wT??b6/fC?m??d?s@{??,?.?a6`P??s?? ?JTS?S??V??X?ZCq?0?_?1??)?]~??I<?͘v?L?%t???̎?7^*???????"???݀?R𱢯u????~??X?3&XB?d????tL??& ??D??&?诊??@0]?????lجR??B.???KS9  j-?|M΀6?d?f??      8   ?   x???A?0???b7rl?i??T!$?EZט9d0??~?F??C?;?ӏ?ˋ2?U(/???ښ???nx?o?L?C?????h?lPxеi??
XD ?(??J?q??	a?z???[??Lkt??U?Sv??T?@?B?{,??U?f??X?)$?$eᱣ?Zmi?(?LH?q!??? ? ?fo      6     x???KO?@????hRM?07?J?BByHwS(C[
?Z??&????,n??s??r6????]Pw??L ?umǚ?ԂP?c??0	>???????2???<?3?{O?#?2?`?,x-?Q??Ir̺?_sY?????????????0<	"t?Ȕ( +ŚH??ҙ$~?>?a??`:Sz????_ߎ???????c?򆥧??[??*????;????h?y??s{??];^???52N??-ݮv0?l??!?#??Pɢ?S?t??h??r?      @   ?   x???=?0??????*?!??&?89t(H[?[uD_>????!?L??7<]????~???3?og?????ez?i?;?????4?P?Mm<??z???M??]dRb`???X?Qr??$?.?d"???kks?&Ҋ?c?u???????????fn     
// ... previous imports remain the same ...

export default function ServiceCityPage() {
  const navigate = useNavigate();
  const { typeService, city } = useParams();
  
  // 解析 typeService 參數
  const { type, service } = parseTypeService(typeService);
  
  // 驗證參數
  if (!type || !service || !city) {
    console.error('Invalid parameters:', { type, service, city });
    navigate('/');
    return null;
  }
  
  const typeInfo = services.types[type];

  // 驗證商家類型
  if (!typeInfo) {
    return (
      <Container size="md" py="xl">
        <Title order={1} align="center" mb="xl">
          Service Type Not Found
        </Title>
        <Text align="center" mb="xl">
          The service type does not exist in our directory.
        </Text>
        <Group position="center">
          <Button onClick={() => navigate('/')}>
            Back to Home
          </Button>
        </Group>
      </Container>
    );
  }

  // 驗證服務
  if (!typeInfo.services.includes(service)) {
    return (
      <Container size="md" py="xl">
        <Title order={1} align="center" mb="xl">
          Service Not Found
        </Title>
        <Text align="center" mb="xl">
          The service "{format.toDisplay(service)}" is not available for {typeInfo.displayName}.
        </Text>
        <Group position="center">
          <Button onClick={() => navigate(generatePath.type(type))}>
            Back to {typeInfo.displayName}
          </Button>
          <Button onClick={() => navigate('/')}>
            Back to Home
          </Button>
        </Group>
      </Container>
    );
  }

  // 驗證城市
  if (!locationUtils.isCityValid(city)) {
    return (
      <Container size="md" py="xl">
        <Title order={1} align="center" mb="xl">
          City Not Found
        </Title>
        <Text align="center" mb="xl">
          The city "{format.toDisplay(city)}" does not exist in our directory.
        </Text>
        <Group position="center">
          <Button onClick={() => navigate(generatePath.type(type))}>
            Back to {typeInfo.displayName}
          </Button>
          <Button onClick={() => navigate('/')}>
            Back to Home
          </Button>
        </Group>
      </Container>
    );
  }

  // 獲取商家數據
  const businesses = getBusinessesByTypeAndServiceAndCity(type, service, city);
  const districts = locationUtils.getDistrictsForCity(city);

  // ... rest of the component remains the same ...
}
